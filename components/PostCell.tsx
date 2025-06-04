import { Post } from "@/data";
import { Text, TouchableOpacity } from "react-native";

export default function PostCell({
  post,
  onPress,
}: {
  post: Post;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={{
        padding: 16,
        borderBottomColor: "#DDD",
        borderBottomWidth: 1,
        gap: 8,
      }}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={{ fontSize: 12, color: "#999" }}>{`#${post.id}`}</Text>
      <Text style={{ fontSize: 16, fontWeight: 600 }}>{post.title}</Text>
      <Text>{post.body}</Text>
    </TouchableOpacity>
  );
}
