import React from 'react';

export const Button = ({ children, onClick, variant = 'primary' }) => {
  const baseClasses = 'px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500'
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export const Input = ({ label, value, onChange, type = 'text', placeholder }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <span className="sr-only">Close</span>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export const Spinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

export const Alert = ({ type = 'info', message }) => {
  const typeClasses = {
    info: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700'
  };

    return (
        <div className={`p-4 rounded-md ${typeClasses[type]}`}>
            {message}
        </div>
    );
};

export const Card = ({ title, children }) => (
    <div className="bg-white shadow-md rounded-lg p-6">
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <div className="card-body">
            {children}
        </div>
    </div>
);

export const Badge = ({ children, variant = 'primary' }) => {
  const variantClasses = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-600 text-white',
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white'
  };
    return (
        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${variantClasses[variant]}`}>
            {children}
        </span>
    );
};

export const Tooltip = ({ children, text }) => (
    <div className="relative group">
        {children}
        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
            {text}
        </div>
    </div>
);

export const Avatar = ({ src, alt, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };
    return (
        <img src={src} alt={alt} className={`rounded-full ${sizeClasses[size]}`} />
    );
};

export const Divider = () => (
    <hr className="my-4 border-gray-300" />
);

export const List = ({ items }) => (
    <ul className="list-disc pl-5">
        {items.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
    </ul>
);

export const Table = ({ columns, data }) => (
    <table className="min-w-full bg-white">
        <thead>
            <tr>
                {columns.map((column) => (
                    <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {column.title}
                    </th>
                ))}
            </tr>
        </thead>
        <tbody className="bg-white">
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {columns.map((column) => (
                        <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {row[column.key]}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

export const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex items-center justify-center space-x-2">
        <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} variant="secondary">
            Previous
        </Button>
        <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
        </span>
        <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} variant="secondary">
            Next
        </Button>
    </div>
);

export const Tabs = ({ tabs, activeTab, onTabChange }) => (
    <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onTabChange(tab.key)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.key
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    {tab.title}
                </button>
            ))}
        </nav>
    </div>
);

export const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = React.useState(null);

    const toggleIndex = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <div className="border rounded-md">
            {items.map((item, index) => (
                <div key={index} className="border-b">
                    <button
                        onClick={() => toggleIndex(index)}
                        className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                    >
                        {item.title}
                    </button>
                    {activeIndex === index && (
                        <div className="px-4 py-2">
                            {item.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export const Breadcrumbs = ({ items }) => (
    <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1">
            {items.map((item, index) => (
                <li key={index} className="inline-flex items-center">
                    {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                    <a href={item.href} className="text-sm text-gray-500 hover:text-gray-700">
                        {item.label}
                    </a>
                </li>
            ))}
        </ol>
    </nav>
);

export const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-4">
        <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
);

export const StarRating = ({ rating, maxRating = 5 }) => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
        stars.push(
            <span key={i} className={`text-xl ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                &#9733;
            </span>
        );
    }
    return <div className="flex">{stars}</div>;
};

export const Tag = ({ children, variant = 'primary' }) => {
  const variantClasses = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-600 text-white',
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white'
    };
    return (
        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${variantClasses[variant]}`}>
            {children}
        </span>
    );
};

export const Icon = ({ name, size = 'md', color = 'currentColor' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };
    return (
        <svg className={sizeClasses[size]} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <use xlinkHref={`#icon-${name}`} />
        </svg>
    );
};

export const Link = ({ children, href, onClick }) => (
    <a href={href} onClick={onClick} className="text-blue-600 hover:underline">
        {children}
    </a>
);

export const Checkbox = ({ label, checked, onChange }) => (
    <label className="inline-flex items-center">
        <input type="checkbox" checked={checked} onChange={onChange} className="form-checkbox" />
        <span className="ml-2">{label}</span>
    </label>
);

export const Radio = ({ label, name, value, checked, onChange }) => (
    <label className="inline-flex items-center">
        <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="form-radio" />
        <span className="ml-2">{label}</span>
    </label>
);

export const Switch = ({ label, checked, onChange }) => (
    <label className="inline-flex items-center cursor-pointer">
        <div className="relative">
            <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
            <div className={`block w-10 h-6 rounded-full ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'transform translate-x-4' : ''}`}></div>
        </div>
        <span className="ml-2">{label}</span>
    </label>
);

export const Textarea = ({ label, value, onChange, placeholder }) => (
    <div className="mb-4">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
);

export const FileInput = ({ label, onChange }) => (
    <div className="mb-4">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <input type="file" onChange={onChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700" />
    </div>
);

export const DatePicker = ({ label, value, onChange }) => (
    <div className="mb-4">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <input type="date" value={value} onChange={onChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
    </div>
);

export const TimePicker = ({ label, value, onChange }) => (
    <div className="mb-4">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <input type="time" value={value} onChange={onChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
    </div>
);

export const ColorPicker = ({ label, value, onChange }) => (
    <div className="mb-4">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <input type="color" value={value} onChange={onChange} className="block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
    </div>
);

export const RangeInput = ({ label, value, onChange, min = 0, max = 100 }) => (
    <div className="mb-4">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <input type="range" value={value} onChange={onChange} min={min} max={max} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
    </div>
);

export const SearchInput = ({ value, onChange, placeholder }) => (
    <div className="mb-4">
        <input type="search" value={value} onChange={onChange} placeholder={placeholder} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
    </div>
);

export const PaginationControls = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex items-center justify-center space-x-2">
        <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} variant="secondary">
            Previous
        </Button>
        <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
        </span>
        <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} variant="secondary">
            Next
        </Button>
    </div>
);

export const TabNavigation = ({ tabs, activeTab, onTabChange }) => (
    <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onTabChange(tab.key)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.key
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    {tab.title}
                </button>
            ))}
        </nav>
    </div>
);

export default {
    Button,
    Input,
    Modal,
    Spinner,
    Alert,
    Card,
    Badge,
    Tooltip,
    Avatar,
    Divider,
    List,
    Table,
    Pagination,
    Tabs,
    Accordion,
    Breadcrumbs,
    ProgressBar,
    StarRating,
    Tag,
    Icon,
    DatePicker,
    TimePicker,
    ColorPicker,
    RangeInput,
    SearchInput,
    PaginationControls,
    TabNavigation
};
