import { Comment, Post } from "@/data";
import { Text, View } from "react-native";

export default function PostCell({
  comment,
  onPress,
}: {
  comment: Comment;
  onPress?: () => void;
}) {
  return (
    <View
      style={{
        padding: 16,
        borderBottomColor: "#DDD",
        borderBottomWidth: 1,
        gap: 8,
      }}
    >
      <Text style={{ fontSize: 12, color: "#999" }}>{`#${comment.id}`}</Text>
      <Text style={{ fontSize: 16, fontWeight: 600 }}>{comment.name}</Text>
      <Text style={{ fontSize: 14 }}>{comment.email}</Text>
      <Text style={{ fontSize: 14 }}>{comment.body}</Text>
    </View>
  );
}
