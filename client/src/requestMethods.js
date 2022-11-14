import axios from 'axios';

const BASE_URL = 'http://localhost:5004/api/';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjhiNmY2ODlkM2JjOWJmZjIzZjI0MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2Nzk5MjUzNCwiZXhwIjoxNjY4MjUxNzM0fQ.DV2Nj1_LuLivURbwq-6ju1qnuOfk2ksCyGeDo0nC7FY'

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`}
});