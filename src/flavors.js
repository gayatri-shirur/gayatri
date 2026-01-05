/**
 * UI Theme Configuration (Flavors)
 * Centralized color and styling definitions for all themes
 */

const flavors = {
  light: {
    name: 'Light',
    // Colors
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    accentColor: '#ec4899',
    textColor: '#1f2937',
    textSecondary: '#6b7280',
    backgroundColor: '#f9fafb',
    cardBackground: '#ffffff',
    navBackground: 'rgba(255, 255, 255, 0.95)',
    
    // Border & Shadow
    borderColor: '#e5e7eb',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    
    // Glass Effect
    glassEffect: true,
    glassBackground: 'rgba(255, 255, 255, 0.1)',
    glassBlur: '20px',
    glassBorder: 'rgba(255, 255, 255, 0.2)',
    
    // Buttons
    buttonPrimary: '#6366f1',
    buttonSecondary: '#8b5cf6',
    buttonHover: '#4f46e5',
    buttonText: '#ffffff',
    
    // Links
    linkColor: '#6366f1',
    linkHover: '#4f46e5',
    
    // Status Colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  dark: {
    name: 'Dark',
    // Colors
    primaryColor: '#818cf8',
    secondaryColor: '#a78bfa',
    accentColor: '#f472b6',
    textColor: '#f9fafb',
    textSecondary: '#d1d5db',
    backgroundColor: '#0f172a',
    cardBackground: '#1e293b',
    navBackground: 'rgba(30, 41, 59, 0.95)',
    
    // Border & Shadow
    borderColor: '#334155',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    
    // Glass Effect
    glassEffect: true,
    glassBackground: 'rgba(15, 23, 42, 0.7)',
    glassBlur: '25px',
    glassBorder: 'rgba(100, 116, 139, 0.3)',
    
    // Buttons
    buttonPrimary: '#818cf8',
    buttonSecondary: '#a78bfa',
    buttonHover: '#6366f1',
    buttonText: '#ffffff',
    
    // Links
    linkColor: '#818cf8',
    linkHover: '#6366f1',
    
    // Status Colors
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
  },

  liquidGlass: {
    name: 'Liquid Glass',
    // Colors
    primaryColor: '#60a5fa',
    secondaryColor: '#a78bfa',
    accentColor: '#f472b6',
    textColor: '#f0f9ff',
    textSecondary: '#cbd5e1',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 100%)',
    cardBackground: 'transparent',
    navBackground: 'transparent',
    
    // Border & Shadow
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    
    // Glass Effect
    glassEffect: true,
    glassBackground: 'rgba(255, 255, 255, 0.1)',
    glassBlur: '30px',
    glassBorder: 'rgba(255, 255, 255, 0.25)',
    
    // Buttons
    buttonPrimary: 'rgba(96, 165, 250, 0.8)',
    buttonSecondary: 'rgba(167, 139, 250, 0.8)',
    buttonHover: 'rgba(59, 130, 246, 0.9)',
    buttonText: '#ffffff',
    
    // Links
    linkColor: '#60a5fa',
    linkHover: '#3b82f6',
    
    // Status Colors
    success: '#6ee7b7',
    warning: '#fcd34d',
    error: '#fca5a5',
    info: '#93c5fd',
    
    // Gradient Animation
    gradientAnimation: true,
  },
};

/**
 * Get theme configuration by name
 * @param {string} themeName - Name of the theme (light, dark, liquidGlass)
 * @returns {object} Theme configuration object
 */
export const getFlavor = (themeName) => {
  return flavors[themeName] || flavors.light;
};

/**
 * Get all available theme names
 * @returns {array} Array of theme names
 */
export const getAvailableFlavors = () => {
  return Object.keys(flavors);
};

/**
 * Get theme display name
 * @param {string} themeName - Name of the theme
 * @returns {string} Display name of the theme
 */
export const getFlavorDisplayName = (themeName) => {
  return flavors[themeName]?.name || themeName;
};

export default flavors;
