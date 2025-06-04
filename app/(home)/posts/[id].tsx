import PostCell from "@/components/PostCell";
import { fetchPost, Post } from "@/data";
import { InfiniteData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

//ref https://docs.expo.dev/develop/dynamic-routes/
//ref https://tanstack.com/query/latest/docs/framework/react/guides/initial-query-data

export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();
  const {
    data: post,
    status,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(Number(id)),
    initialData: () => {
      return queryClient
        .getQueryData<InfiniteData<Post>>(["posts"])
        ?.pages.flatMap((page) => page)
        .find((post) => post.id === Number(id));
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      {status === "pending" ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : !post || status === "error" ? (
        <View>
          <Text>Error: {error.message}</Text>
        </View>
      ) : (
        <PostCell post={post} />
      )}
    </View>
  );
}
