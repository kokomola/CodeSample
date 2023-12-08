export type Review = {
    isNeed: boolean;
    lastAsking: Date | null;
    countOfAsking: number;
}

export const defaultReview: Review = {
    isNeed: true,
    lastAsking: null,
    countOfAsking: 0,
};