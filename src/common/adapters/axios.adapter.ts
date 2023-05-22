import { Injectable } from "@nestjs/common";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import axios, { AxiosInstance } from 'axios';

// patrón Adapter
@Injectable()
export class AxiosAdapter implements HttpAdapter {
    private axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url);
            return data;
        } catch (e) {
            throw new Error("This is an error. Check logs.");
        }
    }
}