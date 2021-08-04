const styles = {
  button: {
    position: 'relative' as const,
    backgroundColor: '#9ca9ff',
    '&:hover': {
      backgroundColor: '#576df9',
    },
  },

  counterContainer: {
    position: 'absolute' as const, 
    bottom: 2, 
    right: 2,
  },
};

export default styles;
