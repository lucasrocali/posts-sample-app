import PostCell from "@/components/PostCell";
import { fetchPosts } from "@/data";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

//ref https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries

export default function HomeScreen() {
  const { data, error, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam }) => fetchPosts(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    });

  const posts = data?.pages.flatMap((page) => page) ?? [];

  return (
    <FlatList
      style={{ backgroundColor: "#FFF" }}
      data={posts}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => (
        <PostCell
          post={item}
          onPress={() => router.navigate(`/posts/${item.id}`)}
        />
      )}
      ListEmptyComponent={() => (
        <View style={{ padding: 16 }}>
          {status === "pending" ? (
            <ActivityIndicator />
          ) : status === "error" ? (
            <Text>Error: {error.message}</Text>
          ) : null}
        </View>
      )}
      ListFooterComponent={() => (
        <View style={{ padding: 16 }}>
          {isFetchingNextPage ? <ActivityIndicator /> : null}
        </View>
      )}
      onEndReachedThreshold={0.8}
      onEndReached={() => fetchNextPage()}
    />
  );
}
