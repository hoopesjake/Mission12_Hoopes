import React from 'react';

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onCategoryChange }) => {
    return (
        <div className="mb-3">
            <label className="form-label">Filter by Category</label>
            <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilter;
