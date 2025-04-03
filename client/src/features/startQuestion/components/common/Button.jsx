export default function Button({
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    ...props
  }) {
    // Base classes
    const baseClasses = 'rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all';
    
    // Size classes
    let sizeClasses = 'px-4 py-2 text-base'; // medium default
    if (size === 'small') sizeClasses = 'px-3 py-1.5 text-sm';
    if (size === 'large') sizeClasses = 'px-6 py-3 text-lg';
  
    // Variant classes
    let variantClasses = 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'; // primary default
    if (variant === 'secondary') variantClasses = 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500';
    if (variant === 'danger') variantClasses = 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
    if (variant === 'outline') variantClasses = 'border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-500';
  
    // Disabled state
    const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';
  
    // Icon positioning
    const iconClasses = Icon ? 'flex items-center gap-2' : '';
  
    return (
      <button
        className={`${baseClasses} ${sizeClasses} ${variantClasses} ${disabledClasses} ${iconClasses} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {Icon && iconPosition === 'left' && (
          <Icon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        )}
      </button>
    );
  }