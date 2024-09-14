
// Calculate BMR (Calories burned doing nothing)
export function calculate_bmr(weight: number, height: number, age: number, male: bool): number {
    if (male)
        return 66.47 + (6.24 * weight) + (12.7 * height) - (6.755 * age);

    return 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
}

// Calculate difference in calories from normal to lose x pounds per week.
export function calorie_delta_goal(lbs_per_week: number): number {
    return (3500.0 / 7.0) * lbs_per_week;
}
