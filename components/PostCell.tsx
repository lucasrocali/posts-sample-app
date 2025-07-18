import { Post } from "@/data";
import { Text, TouchableOpacity } from "react-native";

export default function PostCell({
  testID,
  post,
  preview,
  onPress,
}: {
  testID?: string;
  post: Post;
  preview?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      testID={testID}
      style={{
        padding: 16,
        borderBottomColor: "#DDD",
        borderBottomWidth: 1,
        gap: 8,
      }}
      activeOpacity={0.8}
      disabled={!onPress}
      onPress={onPress}
    >
      <Text style={{ fontSize: 16, fontWeight: 600 }}>{post.title}</Text>
      <Text style={{ fontSize: 14 }} numberOfLines={preview ? 2 : undefined}>
        {post.body}
      </Text>
    </TouchableOpacity>
  );
}
