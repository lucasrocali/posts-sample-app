import { jest } from "@jest/globals";
import { router } from "expo-router";
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import PostsScreen from "@/app/(home)/index";
import { POST_1, POST_2, POST_3, POST_4 } from "@/data/mock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchPosts } from "@/data";

jest.mock("@/data");
jest.mock("expo-router");

const mockedFetchPosts = fetchPosts as jest.MockedFunction<typeof fetchPosts>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithQueryClient = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

/*
refs
- https://docs.expo.dev/develop/unit-testing/
- https://github.com/callstack/react-native-testing-library
*/

jest.useFakeTimers();

describe("<PostsScreen />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  test("should show posts and navigate to /posts/[id]", async () => {
    mockedFetchPosts.mockResolvedValueOnce([POST_1, POST_2]);

    const { findByTestId, getByTestId, findByText } = renderWithQueryClient(
      <PostsScreen />
    );

    await findByTestId("loading-activity-indicator");

    await waitForElementToBeRemoved(() =>
      getByTestId("loading-activity-indicator")
    );

    await findByText(POST_1.title);

    await findByText(POST_2.title);

    fireEvent.press(getByTestId(`post-${POST_1.id}`));

    expect(router.navigate).toHaveBeenCalledWith(`/posts/${POST_1.id}`);
  });

  test("should show error message", async () => {
    const errorMessage = "Some error";
    const error = new Error(errorMessage);
    mockedFetchPosts.mockRejectedValueOnce(error);

    const { findByTestId, getByTestId, findByText } = renderWithQueryClient(
      <PostsScreen />
    );

    await findByTestId("loading-activity-indicator");

    await waitForElementToBeRemoved(() =>
      getByTestId("loading-activity-indicator")
    );

    await findByText(errorMessage);
  });

  test("should load second page of posts when reach end of page", async () => {
    mockedFetchPosts
      .mockResolvedValueOnce([POST_1, POST_2])
      .mockResolvedValueOnce([POST_3, POST_4]);

    const { getByTestId, findByText } = renderWithQueryClient(<PostsScreen />);

    await waitForElementToBeRemoved(() =>
      getByTestId("loading-activity-indicator")
    );

    await findByText(POST_1.title);

    await findByText(POST_2.title);

    fireEvent(getByTestId("posts-flat-list"), "onEndReached");

    await findByText(POST_3.title);

    await findByText(POST_4.title);
  });

  test("should filter posts by content", async () => {
    mockedFetchPosts.mockResolvedValueOnce([POST_1, POST_2]);

    const { findByTestId, getByTestId, findByText, queryByText } =
      renderWithQueryClient(<PostsScreen />);

    await findByTestId("loading-activity-indicator");

    await waitForElementToBeRemoved(() =>
      getByTestId("loading-activity-indicator")
    );

    await findByText(POST_1.title);

    await findByText(POST_2.title);

    fireEvent(getByTestId("search-text-input"), "onChangeText", POST_1.title);

    await findByText(POST_1.title);

    expect(queryByText(POST_2.title)).toBeNull();
  });
});
