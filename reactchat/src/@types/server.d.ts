export interface Server {
    id: number;
    name: string;
    server: string;
    description: string;
    category: string;
    icon: string;
    channel_server : {
        id: number;
        name: string;
        server: string;
        topic: string;
        owner: number;
    }[];
}