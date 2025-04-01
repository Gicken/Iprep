export const logout = async () => {
    console.log('Logging out...');
    try {
      sessionStorage.clear();
      console.log('User logged out');
      return { message: 'Logged out successfully' };
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };