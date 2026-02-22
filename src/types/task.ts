export type Priority = 'low' | 'medium' | 'high'

export type FilterStatus = 'all' | 'active' | 'completed'

export type SortField = "priority" | 'title' | "createdAt" | 'manual'

export type SortBy = 'asc' | 'desc'

export type PriorityAll = 'all' | "low" | "medium" | "high";


export interface Task {
    id: string,
    title: string,
    description?: string,
    priority: Priority,
    completed: boolean,
    createdAt: Date,
}

export interface Filters{
    status: FilterStatus,
    priority: Priority | 'all',
    search: string,
    sortField: SortField,
    sortBy: SortBy
}