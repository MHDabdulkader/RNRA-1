import { faker } from "@faker-js/faker";

export const MAX_MASSAGES = 6;

faker.seed(12);


const generateNewImage = [...Array(20).keys()].map(()=> ({
    key: faker.string.uuid(),
    title: faker.music.artist(),
    image: faker.image.url({
        width: 300,
        height: 300 * 1.4,
        // category: "nature"
    }),
    bg: faker.color.rgb(),
    description: faker.lorem.sentences({min: 1, max: 3}),
    author:{
        name: faker.person.fullName(),
        avater: faker.image.avatarGitHub(),
    }
})
)

export type ImageType = (typeof generateNewImage)[0]
export default generateNewImage;
// export type ImageItem = ReturnType<typeof generateNewImage>