import { FlatList, Text, View, Image, ActivityIndicator } from "react-native";
import { Header } from "../../components/Header";
import { styles } from "./styles";
import { useEffect, useState, useCallback } from "react";
import { LazyImage } from "../../components/LazyImage";

export const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState([]);

  const loadPage = async (pageNumber = page, shouldRefresh = false) => {
    if (total && pageNumber > total) {
      return;
    }

    setLoading(true);

    const response = await fetch(
      `http://localhost:3000/feed?_expand=author&_limit=4&_page=${pageNumber}`
    );

    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");

    setTotal(Math.ceil(totalItems / 5));

    if (shouldRefresh) {
      setFeed(data);
    } else {
      setFeed([...feed, ...data]);
    }

    setPage(page + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadPage();
  }, []);

  const refreshList = async () => {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  };

  const handleViwableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);

  return (
    <>
      <Header />

      <View style={styles.container}>
        <FlatList
          data={feed}
          keyExtractor={(post) => String(post.id)}
          onEndReached={() => loadPage()}
          onEndReachedThreshold={0.1}
          onRefresh={refreshList}
          refreshing={refreshing}
          onViewableItemsChanged={handleViwableChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 10 }}
          ListFooterComponent={
            loading && (
              <ActivityIndicator
                size="small"
                color="#999"
                style={styles.loading}
              />
            )
          }
          renderItem={({ item }) => (
            <View style={styles.post}>
              <View style={styles.header}>
                <Image
                  style={styles.avatar}
                  source={{ uri: item.author.avatar }}
                />

                <Text style={styles.name}>{item.author.name}</Text>
              </View>

              <LazyImage
                shouldLoad={viewable.includes(item.id)}
                aspectRatio={item.aspectRatio}
                smallSource={item.small}
                source={item.image}
              />

              <Text style={styles.description}>
                <Text style={styles.name}>{item.author.name}</Text>{" "}
                {item.description}
              </Text>
            </View>
          )}
        />
      </View>
    </>
  );
};
