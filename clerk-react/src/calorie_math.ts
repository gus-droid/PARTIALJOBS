export enum ExerciseLevel {
    Sedentary,
    Light,
    Moderate,
    Extreme
};



// Calculate BMR (Calories burned doing nothing)
export function calculate_bmr(weight: number, height: number, age: number, male: boolean): number {
    if (male)
        return 66.47 + (6.24 * weight) + (12.7 * height) - (6.755 * age);

    return 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
}

// Calculate difference in calories from normal to lose x pounds per week.
export function calorie_delta_goal(lbs_per_week: number): number {
    return (3500.0 / 7.0) * lbs_per_week;
}

export function energy_delta(bmr: number, level: ExerciseLevel): number {
    switch (level) {
        case ExerciseLevel.Sedentary:
            return bmr * 0.2;
        case ExerciseLevel.Light:
            return bmr * 0.375;
        case ExerciseLevel.Moderate:
            return bmr * 0.5;
        case ExerciseLevel.Extreme:
            return bmr * 0.9;
    }
}



export default { calculate_bmr };
