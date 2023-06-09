import path from "path";
import LinkedinApis from "../services/apisRequest.js"
import fs from "fs"

const imageUpload = async (userUrn) => {
  try {
    const uploadRegister = {
      "registerUploadRequest": {
        "owner": `urn:li:person:${userUrn}`,
        "recipes": [
          "urn:li:digitalmediaRecipe:feedshare-image"
        ],
        "serviceRelationships": [
          {
            "identifier": "urn:li:userGeneratedContent",
            "relationshipType": "OWNER"
          }
        ],
        "supportedUploadMechanism": [
          "SYNCHRONOUS_UPLOAD"
        ]
      }
    }

    const r = await LinkedinApis.imgRegistor(uploadRegister);
    const image_urn = r.data.value.asset.split(":").pop();

    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const imagePath = path.join(__dirname, "../assets", "images.jpg")
    const image = fs.readFileSync(imagePath);

    const res = await LinkedinApis.imgUploader(r?.data?.valuimage_urneimage_urn?.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"]?.uploadUrl, image);

    console.log(res, image_urn)
    return image_urn
  } catch (error) {
    console.error('Error uploadImg:', error);
  }
}

export default imageUpload;
