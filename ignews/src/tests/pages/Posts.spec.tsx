import { render, screen } from "@testing-library/react";
import { createClient } from '../../../prismicio';
import Posts, { getStaticProps } from "../../pages/posts";

jest.mock("../../../prismicio");

const posts = [
    {
        slug: "my-new-post",
        title: "My New Post",
        excerpt: "Post excerpt",
        updatedAt: "10 de Abril",
    },
];

describe("Posts page", () => {
    it("renders correctly", () => {
        render(<Posts posts={posts} />);

        expect(screen.getByText(/my new post/i)).toBeInTheDocument();
    });

    it("loads initial data", async () => {
        const getPrismicClientMocked = jest.mocked(createClient);

        getPrismicClientMocked.mockReturnValueOnce({
            get: jest.fn().mockResolvedValueOnce({
                results: [
                    {
                        uid: "my-new-post",
                        data: {
                            title: [{ type: "heading", text: "My New Post" }],
                            content: [{ type: "paragraph", text: "Post excerpt" }],
                        },
                        last_publication_date: "04-01-2021",
                    },
                ],
            }),
        } as any);

        const response = await getStaticProps({});

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    posts: [
                        {
                            slug: "my-new-post",
                            title: "My New Post",
                            excerpt: "Post excerpt",
                            updatedAt: "01 de abril de 2021",
                        },
                    ],
                },
            })
        );
    });
});