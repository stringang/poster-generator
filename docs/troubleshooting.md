# Troubleshooting

## 生成图片方向不对

获取图片的 `Exif` 信息，Exif `orientation` flag 标识图片的方向。

系统工具会自动根据图片的 `orientation` 属性 auto-rotate，**导致我们人眼所见图片是正向的，但程序执行结果是反向的**。

```shell
# 获取 exif
curl https://examples-1251000004.cos.ap-shanghai.myqcloud.com/sample.jpeg?exif
```

- https://jdhao.github.io/2019/07/31/image_rotation_exif_info/
- https://www.daveperrett.com/articles/2012/07/28/exif-orientation-handling-is-a-ghetto/
- https://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images
