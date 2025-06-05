import PostCell from "@/components/PostCell";
import { fetchPosts } from "@/data";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";

//ref https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries

export default function HomeScreen() {
  const [searchingText, setSearchingText] = useState("");
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

  const isSearching = !!searchingText;

  const filteredPosts = isSearching
    ? posts.filter(
        (post) =>
          post.title.includes(searchingText) ||
          post.body.includes(searchingText)
      )
    : posts;

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={{ padding: 16, borderBottomWidth: 1, borderColor: "#DDD" }}>
        <TextInput
          placeholder="Buscar por título ou conteúdo"
          placeholderTextColor={"#999"}
          value={searchingText}
          onChangeText={setSearchingText}
        />
      </View>
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <PostCell
            post={item}
            preview
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
        onEndReached={() => !isSearching && fetchNextPage()}
      />
    </View>
  );
}
