import { useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DiaryCard from "../../src/components/DiaryCard";
import { useDiary } from "../../src/context/DiaryContext";
import { useDiarySearch } from "../../src/hooks/useDiarySearch";
import { COLORS, SPACE, TYPO } from "../../src/styles/tokens";

const MOOD_OPTIONS = ['😊', '🎯', '😌', '🥳'];

export default function HomeScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();
  const {
    query,
    setQuery,
    selectedMood,
    setSelectedMood,
    filteredEntries,
    resultCount,
    resetFilters,
  } = useDiarySearch(entries);

  const searchRef = useRef<React.ElementRef<typeof TextInput>>(null);

  const openDetail = useCallback(
    (id: number) => {
      router.push({
        pathname: "/detail/[id]",
        params: { id: String(id) },
      });
    },
    [router]
  );

  const handleReset = useCallback(() => {
    resetFilters();
    searchRef.current?.focus();
  }, [resetFilters]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>
      
      {/* Search Input */}
      <View style={styles.searchRow}>
        <TextInput
          ref={searchRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Cari diary..."
          style={styles.search}
        />
        <Pressable onPress={handleReset} style={styles.resetButton}>
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>
      </View>

      {/* Mood Filter */}
      <View style={styles.moodFilterRow}>
        {MOOD_OPTIONS.map((mood) => (
          <Pressable
            key={mood}
            onPress={() => setSelectedMood(selectedMood === mood ? null : mood)}
            style={[
              styles.moodChip,
              selectedMood === mood && styles.moodChipSelected,
            ]}
          >
            <Text style={styles.moodText}>{mood}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.counter}>{resultCount} entri ditemukan</Text>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={() => openDetail(item.id)}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Diary tidak ditemukan.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.m,
  },
  searchRow: {
    flexDirection: "row",
    gap: SPACE.s,
    marginBottom: SPACE.s,
  },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
  },
  resetButton: {
    justifyContent: "center",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  resetText: {
    fontWeight: "600",
    color: COLORS.danger,
  },
  moodFilterRow: {
    flexDirection: "row",
    gap: SPACE.s,
    marginVertical: SPACE.s,
  },
  moodChip: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#fff",
  },
  moodChipSelected: {
    borderColor: COLORS.accent,
    borderWidth: 2,
    backgroundColor: "#EFF6FF",
  },
  moodText: {
    fontSize: 18,
  },
  counter: {
    color: COLORS.muted,
    marginVertical: SPACE.s,
  },
  list: {
    gap: SPACE.m,
    paddingBottom: SPACE.xl,
  },
  empty: {
    textAlign: "center",
    color: COLORS.muted,
    paddingTop: 40,
  },
});