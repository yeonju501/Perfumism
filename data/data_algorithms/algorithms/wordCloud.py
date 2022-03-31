from wordcloud import WordCloud
from collections import Counter
import matplotlib.pyplot as plt
from django.utils.timezone import now
import uuid

def word_cloud(word_list):
    counts = Counter(word_list)
    main_accords = [counts.most_common(3)[0][0], counts.most_common(3)[1][0], counts.most_common(3)[2][0]]

    wc = WordCloud(font_path="./data_algorithms/algorithms/tvN 즐거운이야기 Bold.ttf", width=300, height=300, background_color="white", max_font_size=250)
    cloud = wc.generate_from_frequencies(counts)

    filename = '%s' %(
       './static/' + now().strftime('%Y%m%d') + '_' + str(uuid.uuid4()) + '.jpg'
    )
    cloud.to_file(filename)
    plt.figure()
    plt.axis("off")
    plt.imshow(cloud)
    # plt.show()

    result = [filename, main_accords]
    return result

if __name__ == '__main__':
    # arr = "wine vanilla sweet woody aromatic leather fruity warm spicy powdery animalic fresh violet"
    word_list = ["citrus", "woody", "powdery", "iris", "violet", "fresh", "musky", "amber", "earthy", "fruity", "leather", "powdery", "sweet", "violet", "animalic", "patchouli", "vanilla", "floral", "woody", "leather", "fruity", "woody", "aromatic", "warm", "spicy", "sweet", "powdery", "animalic", "fresh", "spicy", "violet"]
    result = word_cloud(word_list)
    print(result)