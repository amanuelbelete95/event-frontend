// Design System for Event Management Components
// Consistent colors and styling for design coherence

export const EventDesignSystem = {
  // Primary brand color (matches header background)
  primaryColor: "#389999",
  primaryLight: "#6BC9C9",
  primaryDark: "#2D7A7A",

  // Secondary colors
  secondaryColor: "#4A5568", // Gray.700
  accentColor: "#E53E3E",    // Red.500 for important actions

  // Status colors
  statusColors: {
    completed: "green.500",
    in_progress: "blue.500",
    todo: "yellow.500",
    postponed: "orange.500",
    cancelled: "red.500",
    default: "gray.500"
  },

  // Card styling
  card: {
    shadow: "lg",
    borderRadius: "xl",
    borderWidth: "1px",
    borderColor: "gray.100",
    transition: "all 0.2s",
    hover: {
      shadow: "xl",
      transform: "translateY(-2px)"
    }
  },

  // Button styling
  button: {
    primary: {
      bg: "primaryColor",
      color: "white",
      _hover: {
        bg: "primaryDark",
        transform: "translateY(-1px)"
      },
      _active: {
        transform: "translateY(0)"
      }
    },
    secondary: {
      bg: "white",
      color: "primaryColor",
      border: "1px solid",
      borderColor: "primaryColor",
      _hover: {
        bg: "primaryLight",
        color: "white"
      }
    }
  },

  // Form styling
  form: {
    input: {
      borderColor: "gray.300",
      _focus: {
        borderColor: "primaryColor",
        boxShadow: "0 0 0 1px #389999"
      }
    },
    label: {
      fontWeight: "medium",
      color: "gray.700"
    }
  }
};