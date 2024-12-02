import { Level } from "@prisma/client";

// フォルダデータを取得する処理
export const getFolderData = async (id?: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folder${id ? "?folderId=" + id : ""}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("フォルダデータの取得に失敗しました", res.statusText);
    return null;
  }

  const data = await res.json();
  return data.folders;
};

// ブックマークデータを取得する処理
// 引数がない場合は全件、ある場合は特定のブックマークを取得する
export const getBookmarkData = async ({
  folderId,
  bookmarkId,
  page,
}: {
  folderId?: string;
  bookmarkId?: string;
  page?: number;
}) => {
  const params = new URLSearchParams();
  if (folderId) params.append("folderId", folderId);
  if (bookmarkId) params.append("bookmarkId", bookmarkId);
  if (page) params.append("page", page.toString());

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark?${params.toString()}
    `,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  if (!res.ok) {
    console.error("ブックマークデータの取得に失敗しました", res.statusText);
    return null;
  }

  const data = await res.json();
  return data.bookmarks;
};

// ブックマークを新規作成する処理
export const createBookmark = async (
  url: string,
  title: string,
  description: string,
  folder_id: string,
  image: string | null | undefined,
  memo: string | null,
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // 認証を実装次第修正
      userId: "f5a12336-c5d6-4b58-a549-b8f4be0db8b1",
      folder_id,
      url,
      title,
      description,
      image,
      memo,
    }),
  });

  if (!res.ok) {
    console.error("ブックマークの作成に失敗しました", res.statusText);
    return null;
  }
};

// フォルダを新規作成する処理
export const createFolder = async (name: string, parentFolder: string | null, folderLevel: Level) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      // 認証を実装次第修正
      userId: "f5a12336-c5d6-4b58-a549-b8f4be0db8b1",
      parentFolder,
      folderLevel,
    }),
  });

  if (!res.ok) {
    console.error("フォルダの作成に失敗しました", res.statusText);
    return null;
  }
};

// ブックマークを更新する処理
export const updateBookmark = async (
  bookmarId: string,
  url: string,
  title: string,
  description: string,
  folder_id: string,
  image: string | null | undefined,
  memo: string | null,
) => {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark?bookmarkId=${bookmarId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // 認証を実装次第修正
      userId: "f5a12336-c5d6-4b58-a549-b8f4be0db8b1",
      folder_id,
      url,
      title,
      description,
      image,
      memo,
    }),
  });
};

// フォルダを更新する処理
export const updateFolder = async (
  folderId: string,
  currentParentFolderId: string | null,
  currentParentFolderHasChildren: boolean,
  updateParentFolderHasChildren: boolean,
  name: string,
  parentFolder: string | null,
  folderLevel: string,
) => {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folder?folderId=${folderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentParentFolderId,
      currentParentFolderHasChildren,
      updateParentFolderHasChildren,
      // 認証を実装次第修正
      userId: "f5a12336-c5d6-4b58-a549-b8f4be0db8b1",
      name,
      parentFolder,
      folderLevel,
    }),
  });
};

// ブックマークを削除する処理
export const deleteBookmark = async (bookmarkId: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark?bookmarkId=${bookmarkId}`, {
    method: "DELETE",
  });
};

// フォルダを削除する処理
export const deleteFolder = async (
  folderId: string,
  relatedFolders: Array<string>,
  hasSiblingFolders: boolean,
  parentFolderId: string | null,
) => {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folder?folderId=${folderId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      relatedFolders,
      hasSiblingFolders,
      parentFolderId,
    }),
  });
};

// ブックマークの件数を取得する処理
export const countBookmarks = async (folderId?: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark?count=true${folderId ? `&folderId=${folderId}` : ""}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  if (!res.ok) {
    console.error("ブックマーク件数の取得に失敗しました", res.statusText);
    return null;
  }

  const data = await res.json();

  return data.bookmarkCount;
};
