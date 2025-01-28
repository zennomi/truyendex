function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

function process(source, ids) {
  const chunks = chunkArray(ids, 100);
  alert(
    `Bạn có ${ids.length} truyện cần đồng bộ, mất ${chunks.length} lần mở cửa số mới. Chú ý cho phép mở cửa số/pop up mới.`,
  );
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    if (
      confirm(`Đồng bộ ${chunk.length} truyện lần ${i + 1}/${chunks.length}`)
    ) {
      const tdUrl = "http://localhost:3000";
      const newWindow = window.open(
        `${tdUrl}/dong-bo?source=${source}&ids=${chunk.join(",")}`,
        "_blank",
        "width=800,height=600,scrollbars=yes",
      );
      if (!newWindow) {
        alert(
          "Không thể mở cửa sổ mới. Bạn hãy bật chế độ cho phép mở cửa sổ mới và thử lại.",
        );
        break;
      }
    } else {
      break;
    }
  }
}
