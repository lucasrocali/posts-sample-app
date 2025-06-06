import PostCell from "@/components/PostCell";
import CommentCell from "@/components/CommentCell";
import { fetchComments, fetchPost, Post } from "@/data";
import { InfiniteData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View, FlatList } from "react-native";

//ref https://docs.expo.dev/develop/dynamic-routes/
//ref https://tanstack.com/query/latest/docs/framework/react/guides/initial-query-data

export default function PostDetailScreen() {
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

  const { data: comments } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchComments(Number(id)),
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
      <FlatList
        style={{ backgroundColor: "#EEE" }}
        data={comments}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => <CommentCell comment={item} />}
      />
    </View>
  );
}
