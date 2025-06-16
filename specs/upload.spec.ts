import controller from  '../controller/upload.controllers';

describe('Upload File', () => {
  it('POST /upload/single',async () => {
    const res = await controller.postUploadSingle('data/photo.jpeg');
    //console.log(res.body);
    expect(res.body.filename).toEqual('photo.jpeg')
  });

  it('POST /upload/multiple',async () => {
    const files = [
        'data/photo.jpeg',
        'data/22.png'
    ]
    const res = await controller.postUploadMultiple(files);
    expect(res.body.length).toBe(2);
    console.log(res.body);
    expect(res.body[0].filename).toEqual('photo.jpeg')
    expect(res.body[1].filename).toEqual('22.png')
  });
});