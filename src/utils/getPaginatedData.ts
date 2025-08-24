import { Octokit, RequestError } from "octokit";

export default async function getPaginatedData(url: string, perPage: number) {
    const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
    let pagesRemaining = true;
    const octokit = new Octokit({});

    try {
        const response = await octokit.request(`GET ${url}`, {
            per_page: perPage,
            headers: {
                "X-GitHub-Api-Version":
                    "2022-11-28",
            },
        });

        const linkHeader = response.headers.link;

        if (linkHeader) {
            pagesRemaining = linkHeader.includes(`rel="next"`);
            if (pagesRemaining && linkHeader) {
                const matchResult = linkHeader.match(nextPattern);
                if (matchResult && matchResult[0]) {
                    url = matchResult[0];
                } else {
                    url = '';
                }
            } else {
                pagesRemaining = false;
                url = '';
            }
        } else {
            url = '';
        }

        return {
            repos: response.data,
            link: url
        };

    } catch (error) {
        if (error instanceof RequestError && error.message.includes("Not Found")) {
            throw new Error("Пользователь не найден");
        } else {
            throw new Error("Не удалось загрузить репозитории");
        }
    }
}