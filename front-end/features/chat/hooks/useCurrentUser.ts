import { useState, useEffect } from 'react';
import { User } from '../types';

// TODO: Replace with actual API call
export const useCurrentUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Simulate API call - replace with actual implementation
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                // TODO: Replace with actual API endpoint
                // const response = await fetch('/api/user/me');
                // const data = await response.json();

                // Mock data for now
                const mockUser: User = {
                    id: '1',
                    name: 'John Doe',
                    avatar: '',
                    email: 'john.doe@example.com',
                };

                setUser(mockUser);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch user'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, isLoading, error };
};
