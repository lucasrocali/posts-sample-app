import { Post } from "@/data";
import { Text, View } from "react-native";

export default function PostCell({ post }: { post: Post }) {
  return (
    <View
      style={{
        padding: 16,
        borderBottomColor: "#DDD",
        borderBottomWidth: 1,
        gap: 8,
      }}
    >
      <Text style={{ fontSize: 12, color: "#999" }}>{`#${post.id}`}</Text>
      <Text style={{ fontSize: 16, fontWeight: 600 }}>{post.title}</Text>
      <Text>{post.body}</Text>
    </View>
  );
}
