import { Brain, Flame, Snowflake, Zap } from "lucide-react";
import { PowerBallMethodInfo } from "../PowerBallMethodSelect.types";

const POWERBALL_METHODS: PowerBallMethodInfo[] = [
  {
    id: "random",
    label: "Quick Pick",
    shortDescription: "Completely random numbers",
    description: 
      "This is a simple and basic random number generation method.",
    icon: Zap
  },
  {
    id: "hot",
    label: "Hot Numbers",
    shortDescription: "Most frequently drawn numbers",
    description: 
      "Use numbers that have been drawn most frequently in recent Powerball history. This method is based on actual drawing data from the past few months, identifying numbers that appear more often than others.",
    icon: Flame
  },
  {
    id: "cold",
    label: "Cold Numbers",
    shortDescription: "Least frequently drawn numbers",
    description: 
      "Select numbers that have appeared less frequently in recent drawings. Some players believe that 'cold' numbers are 'due' to be drawn soon. This strategy is based on the same historical data as Hot Numbers.",
    icon: Snowflake
  },
  {
    id: "unique",
    label: "Smart Pick",
    shortDescription: "Unique Number",
    description: 
      "Generated only with combinations that have never won before.",
    icon: Brain
  }
]

export default POWERBALL_METHODS;