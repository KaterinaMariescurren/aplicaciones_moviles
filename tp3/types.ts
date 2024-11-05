// types.ts
export type RootStackParamList = {
    Login: undefined;
    HabitList: undefined;
    AddHabit: undefined;
    HabitDetails: { habit: { id: number; name: string; importance: string } };
  };