import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type AppId = string;
export interface App {
    id: AppId;
    reviews: Array<Review>;
    name: string;
    numReviews: bigint;
    description: string;
    fileSize: bigint;
    version: string;
    screenshots: Array<string>;
    category: AppCategory;
    downloadCount: bigint;
    rating: bigint;
    iconUrl: string;
    releaseDate: Time;
    developer: string;
}
export type Time = bigint;
export interface Review {
    comment: string;
    timestamp: Time;
    rating: bigint;
    reviewer: Principal;
}
export enum AppCategory {
    tools = "tools",
    social = "social",
    entertainment = "entertainment",
    productivity = "productivity",
    education = "education",
    games = "games"
}
export interface backendInterface {
    addApp(id: AppId, name: string, description: string, developer: string, category: AppCategory, version: string, fileSize: bigint, iconUrl: string, screenshots: Array<string>, releaseDate: Time): Promise<void>;
    addReview(appId: AppId, rating: bigint, comment: string): Promise<void>;
    getAllApps(): Promise<Array<App>>;
    getAppById(id: AppId): Promise<App | null>;
    getAppsByCategory(category: AppCategory): Promise<Array<App>>;
    searchAppsByDeveloper(searchTerm: string): Promise<Array<App>>;
    searchAppsByName(searchTerm: string): Promise<Array<App>>;
}
