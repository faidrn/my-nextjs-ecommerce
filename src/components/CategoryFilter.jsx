import React from 'react';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/ScrollArea';

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {

  return (
    <Card className="dark:bg-gray-800">
      <CardContent className="p-4">
        <h3 className="mb-4 font-semibold dark:text-white">
          {'categories'}
        </h3>

        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className="space-y-2">
            <button
              onClick={() => onSelectCategory(null)}
              className={`w-full rounded-lg px-4 py-2 text-left transition-colors ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {'allCategories'}
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
                }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-8 w-8 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/32';
                  }}
                />
                <span className="flex-1">{category.name}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};