import tensorflow as tf
import numpy as np
import joblib
import keras


def processing_data(input_list, path_age, path_chol, path_thalach, path_trestbps):
    age_scaler = joblib.load(path_age)
    chol_scaler = joblib.load(path_chol)
    thalach_scaler = joblib.load(path_thalach)
    trestbps_scaler = joblib.load(path_trestbps)

    # Chia list đầu vào thành các phần tương ứng
    age = input_list[0]  # Số thứ nhất
    trestbps = input_list[3]  # Số thứ hai
    chol = input_list[4]  # Số thứ ba
    thalach = input_list[7]  # Số thứ tư

    # Áp dụng scaler tương ứng cho mỗi phần của list
    scaled_part1 = age_scaler.transform([[age]])
    scaled_part2 = trestbps_scaler.transform([[trestbps]])
    scaled_part3 = chol_scaler.transform([[chol]])
    scaled_part4 = thalach_scaler.transform([[thalach]])
    input_list[0] = scaled_part1[0][0]
    input_list[3] = scaled_part2[0][0]
    input_list[4] = scaled_part3[0][0]
    input_list[7] = scaled_part4[0][0]

    return input_list


def predict(data, model_path):
    model = keras.models.load_model(model_path)
    prediction = model.predict(np.array(data).reshape(1, -1))
    return prediction


if __name__ == '__main__':
    path_age = r'C:\Users\Admin\Downloads\Heart_Disease_Prediction\Heart_Disease_Prediction\scaler\scaler\age_scaler.pkl'
    path_chol = r'C:\Users\Admin\Downloads\Heart_Disease_Prediction\Heart_Disease_Prediction\scaler\scaler\chol_scaler.pkl'
    path_thalach = r'C:\Users\Admin\Downloads\Heart_Disease_Prediction\Heart_Disease_Prediction\scaler\scaler\thalach_scaler.pkl'
    path_trestbps = r'C:\Users\Admin\Downloads\Heart_Disease_Prediction\Heart_Disease_Prediction\scaler\scaler\trestbps_scaler.pkl'
    model_path = r'C:\Users\Admin\Downloads\Heart_Disease_Prediction\Heart_Disease_Prediction\model.h5'
    input_list = [63, 1, 3, 145, 233, 1, 0, 150,
                  0, 2.3, 0, 0, 1]  # Ví dụ list đầu vào
    data = processing_data(input_list, path_age, path_chol,
                           path_thalach, path_trestbps)
    prediction = predict(data, model_path)
    if prediction < 0.5:
        print('Không mắc bệnh')
    else:
        print('Mắc bệnh')
