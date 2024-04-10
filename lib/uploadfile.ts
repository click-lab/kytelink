type UploadFileResponse = {
  error?: string
  imageURL?: string
  blurpfp?: string
}

export async function uploadFile(file: File, isPfp?: boolean): Promise<UploadFileResponse> {
  // const getuploadurl = await fetch('/api/images/getuploadurl')
  // const response = await getuploadurl.json()
  // const uploadURL = response.uploadURL
  const uploadURL = 'https://medialab.clicklab.fr/image'

  // const formData = new FormData()
  // formData.append('file', file)

  const upload = await fetch(uploadURL, {
    method: 'POST', body: file, headers: {
      "Content-Type": "file.type",
      "Slug": file.name,
      "Path": "kytelink",
  } })
  // const uploadResponse = await upload.json()
  // if (!uploadResponse.success) return { error: uploadResponse.errors[0].message }

  // const imageURL = uploadResponse.result.variants[0]
  if (!upload.ok) return { error: 'Failed to upload image' }
  const imageURL = upload.headers.get('Location')
    ? getS3MediaUrl(upload.headers.get('Location'))
    : undefined

  if (!isPfp) return { imageURL: imageURL }

  const createblurpfp = await fetch('/api/images/createblurpfp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageurl: imageURL }),
  })

  const { blurpfp } = await createblurpfp.json()

  return { imageURL: imageURL, blurpfp: blurpfp }
}

export function getS3MediaUrl(route: null | undefined | string) {
  if (!route) return ''
  return ('https://cklb-medialab-staging.s3.eu-central-1.amazonaws.com' + route)
    .replace('/image/', '/images/')
    .replace('/pdf/', '/images/')
}