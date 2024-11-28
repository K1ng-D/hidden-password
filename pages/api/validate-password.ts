// pages/api/validate-password.ts

export default function handler(
  req: { method: string; body: { input: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): void; new (): any };
    };
  }
) {
  if (req.method === "POST") {
    const { input } = req.body;

    // Encrypted password (ASCII codes)
    const encryptedData = [
      "111-114-101-110-105-88-123", // "OreninX{"
      "89-48-117-95-70-48-117-110", // "Y0u_F0un"
      "100-95-116-104-51-95-80-97", // "d_th3_Pa"
      "53-53-119-48-82-100-125", // "55w0Rd}"
    ];

    // Decryption function that converts ASCII codes to a string
    const decrypt = (data: any[]) =>
      data
        .map((item) =>
          item
            .split("-")
            .map((char: string) => String.fromCharCode(parseInt(char)))
            .join("")
        )
        .join("");

    // Decrypt the password
    const hiddenPassword = decrypt(encryptedData);

    // Validate the user input
    if (input === hiddenPassword) {
      res
        .status(200)
        .json({ message: "Correct! 🎉 You found the hidden password!" });
    } else {
      res.status(200).json({ message: "Wrong password. Try again!" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
