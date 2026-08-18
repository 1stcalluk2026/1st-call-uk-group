import QRCode from "qrcode";

const HEX = /^#([0-9a-fA-F]{6})$/;

export async function qrSvg(text: string, color = "#233a86"): Promise<string> {
  const dark = HEX.test(color) ? color : "#233a86";
  return QRCode.toString(text, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark, light: "#ffffff" },
  });
}
