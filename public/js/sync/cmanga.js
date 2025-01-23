async function getIds() {
  const ids = [];
  let page = 1;

  while (true) {
    const data = await fetch(
      `/api/user_list?type=album_follow&page=${page}&limit=50&user=${token_user}`,
    ).then((res) => res.json());
    if (data.data.length === 0) break;
    ids.push(...data.data.map((album) => album.id_album));
    page++;
  }

  return ids;
}

getIds().then((ids) => process("cmanga", ids));
