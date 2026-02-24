import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Principal "mo:core/Principal";

actor {
  type AppId = Text;

  type AppCategory = {
    #games;
    #social;
    #productivity;
    #entertainment;
    #education;
    #tools;
  };

  module Review {
    public type Review = {
      reviewer : Principal;
      rating : Nat; // 1-5 scale
      comment : Text;
      timestamp : Time.Time;
    };
  };

  module App {
    public type App = {
      id : AppId;
      name : Text;
      description : Text;
      developer : Text;
      category : AppCategory;
      version : Text;
      fileSize : Nat; // in bytes
      rating : Nat; // average rating, 0-5 scale
      numReviews : Nat;
      downloadCount : Nat;
      iconUrl : Text;
      screenshots : [Text];
      releaseDate : Time.Time;
      reviews : [Review.Review];
    };

    public func compare(app1 : App, app2 : App) : Order.Order {
      Text.compare(app1.name, app2.name);
    };
  };

  let appsMap = Map.empty<AppId, App.App>();

  public shared ({ caller }) func addApp(
    id : AppId,
    name : Text,
    description : Text,
    developer : Text,
    category : AppCategory,
    version : Text,
    fileSize : Nat,
    iconUrl : Text,
    screenshots : [Text],
    releaseDate : Time.Time,
  ) : async () {
    let newApp : App.App = {
      id;
      name;
      description;
      developer;
      category;
      version;
      fileSize;
      rating = 0;
      numReviews = 0;
      downloadCount = 0;
      iconUrl;
      screenshots;
      releaseDate;
      reviews = [];
    };
    appsMap.add(id, newApp);
  };

  public query ({ caller }) func getAllApps() : async [App.App] {
    appsMap.values().toArray().sort();
  };

  public query ({ caller }) func getAppsByCategory(category : AppCategory) : async [App.App] {
    appsMap.values().filter(
      func(app) {
        app.category == category;
      }
    ).toArray().sort();
  };

  public query ({ caller }) func searchAppsByName(searchTerm : Text) : async [App.App] {
    appsMap.values().filter(
      func(app) {
        app.name.toLower().contains(#text(searchTerm.toLower()));
      }
    ).toArray().sort();
  };

  public query ({ caller }) func searchAppsByDeveloper(searchTerm : Text) : async [App.App] {
    appsMap.values().filter(
      func(app) {
        app.developer.toLower().contains(#text(searchTerm.toLower()));
      }
    ).toArray().sort();
  };

  public query ({ caller }) func getAppById(id : AppId) : async ?App.App {
    appsMap.get(id);
  };

  public shared ({ caller }) func addReview(appId : AppId, rating : Nat, comment : Text) : async () {
    if (rating < 1 or rating > 5) {
      return;
    };

    let existingAppOpt = appsMap.get(appId);

    switch (existingAppOpt) {
      case (null) {};
      case (?existingApp) {
        let newReview : Review.Review = {
          reviewer = caller;
          rating;
          comment;
          timestamp = Time.now();
        };

        let updatedReviews = existingApp.reviews.concat([newReview]);
        var sum = 0;
        for (review in updatedReviews.values()) {
          sum += review.rating;
        };
        let newAverage = sum / updatedReviews.size();

        let updatedApp : App.App = {
          existingApp with
          reviews = updatedReviews;
          rating = newAverage;
          numReviews = updatedReviews.size();
        };
        appsMap.add(appId, updatedApp);
      };
    };
  };
};
