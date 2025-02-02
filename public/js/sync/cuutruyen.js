function getAuthTokenAndUser() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("manga4u", 40);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction("auth", "readonly");
      const objectStore = transaction.objectStore("auth");
      const cursorRequest = objectStore.openCursor();

      cursorRequest.onsuccess = () => {
        const cursor = cursorRequest.result;
        if (cursor) {
          resolve(cursor.value);
          // Resolve the first record
        } else {
          resolve(null);
          // Resolve null if no records found
        }
      };

      cursorRequest.onerror = () => reject("Failed to fetch data");
    };

    request.onerror = () => reject("Failed to open database");
  });
}

async function main() {
  const result = await getAuthTokenAndUser();
  if (!result) {
    alert("Vui lòng đăng nhập!");
  } else {
    const { user, authToken } = result;
    const ids = [];
    let page = 1;
    while (true) {
      const { data, _metadata } = await fetch(
        `/api/v2/mangas/following?page=${page}&per_page=24`,
        {
          headers: {
            m4u_token: authToken,
            m4u_uid: user.id,
          },
        },
      ).then((res) => res.json());
      ids.push(...data.map((d) => d.id));
      if (_metadata.current_page >= _metadata.total_pages) break;

      page++;
    }
    process("cuutruyen", ids);
  }
}

main();
