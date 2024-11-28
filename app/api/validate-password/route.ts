export async function POST(req: Request) {
  const { input } = await req.json();

  const encryptedData = [
    "111-114-101-110-105-88-123",
    "89-48-117-95-70-48-117-110",
    "100-95-116-104-51-95-80-97",
    "53-53-119-48-82-100-125",
  ];

  const decrypt = (data: any[]) =>
    data
      .map((item) =>
        item
          .split("-")
          .map((char: string) => String.fromCharCode(parseInt(char)))
          .join("")
      )
      .join("");

  const hiddenPassword = decrypt(encryptedData);

  if (input === hiddenPassword) {
    return new Response(
      JSON.stringify({
        message: "Correct! 🎉 You found the hidden password!",
        status: "success",
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "Wrong password. Try again!",
        status: "error",
      }),
      { status: 200 }
    );
  }
}
