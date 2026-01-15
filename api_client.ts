/**
 * API Client for HTTP requests
 * Handles communication with backend services
 */

interface RequestOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    timeout?: number;
}

interface ApiResponse<T> {
    data: T | null;
    status: number;
    error: string | null;
}

class ApiClient {
    private baseUrl: string;
    private timeout: number;
    private headers: Record<string, string>;

    constructor(baseUrl: string, timeout: number = 5000) {
        this.baseUrl = baseUrl;
        this.timeout = timeout;
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }

    /**
     * Set authorization header
     */
    setAuthToken(token: string): void {
        this.headers['Authorization'] = `Bearer ${token}`;
    }

    /**
     * Make GET request
     */
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    /**
     * Make POST request
     */
    async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data
        });
    }

    /**
     * Make PUT request
     */
    async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data
        });
    }

    /**
     * Make DELETE request
     */
    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }

    /**
     * Internal request handler
     */
    private async request<T>(endpoint: string, options: RequestOptions): Promise<ApiResponse<T>> {
        const url = `${this.baseUrl}${endpoint}`;
        
        try {
            const response = await fetch(url, {
                method: options.method || 'GET',
                headers: { ...this.headers, ...options.headers },
                body: options.body ? JSON.stringify(options.body) : undefined
            });

            const data = await response.json() as T;

            return {
                data,
                status: response.status,
                error: null
            };
        } catch (error) {
            return {
                data: null,
                status: 0,
                error: (error as Error).message
            };
        }
    }
}

export default ApiClient;
