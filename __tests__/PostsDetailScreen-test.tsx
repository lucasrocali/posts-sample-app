import { jest } from "@jest/globals";
import {
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import PostDetailScreen from "@/app/(home)/posts/[id]";
import { COMMENT_1, COMMENT_2, POST_1 } from "@/data/mock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchPost, fetchComments } from "@/data";

jest.mock("@/data");
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn().mockReturnValue({ id: 1 }), //POST_1.id
}));

const mockedFetchPost = fetchPost as jest.MockedFunction<typeof fetchPost>;
const mockedFetchComments = fetchComments as jest.MockedFunction<
  typeof fetchComments
>;

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

describe("<PostDetailScreen />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  test("2.a 2.b - should show post detail and comments", async () => {
    mockedFetchComments.mockResolvedValueOnce([COMMENT_1, COMMENT_2]);
    mockedFetchPost.mockResolvedValueOnce(POST_1);

    const { findByTestId, getByTestId, findByText } = renderWithQueryClient(
      <PostDetailScreen />
    );

    await findByTestId("loading-activity-indicator");

    await waitForElementToBeRemoved(() =>
      getByTestId("loading-activity-indicator")
    );

    await findByText(POST_1.title);
    await findByText(POST_1.body);

    await findByText(COMMENT_1.name);
    await findByText(COMMENT_1.body);

    await findByText(COMMENT_2.name);
    await findByText(COMMENT_2.body);
  });

  test("4.a - should show error message", async () => {
    mockedFetchComments.mockResolvedValueOnce([COMMENT_1, COMMENT_2]);
    const errorMessage = "Some error";
    const error = new Error(errorMessage);
    mockedFetchPost.mockRejectedValueOnce(error);

    const { findByTestId, getByTestId, findByText } = renderWithQueryClient(
      <PostDetailScreen />
    );

    await findByTestId("loading-activity-indicator");

    await waitForElementToBeRemoved(() =>
      getByTestId("loading-activity-indicator")
    );

    await findByText(errorMessage);
  });
});
