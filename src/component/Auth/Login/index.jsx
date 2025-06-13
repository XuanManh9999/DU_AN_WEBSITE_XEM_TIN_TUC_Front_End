import React from "react";
import { Button, Card, Form, Input, Typography, Divider, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import URL from "../../../utils/url";
import { Link } from "react-router-dom";
const { Title, Text } = Typography;

export default function Login() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-700/90 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          alt="Login Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12">
          <div className="max-w-md text-center">
            <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
              Chào mừng đến với
              <br />
              <span className="text-yellow-300">Tin Tức 24/7</span>
            </h1>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Cập nhật tin tức nhanh chóng, chính xác và đáng tin cậy từ khắp
              nơi trên thế giới
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">1M+</div>
                <div className="opacity-80">Người dùng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="opacity-80">Cập nhật</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="opacity-80">Miễn phí</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phần bên phải - Form đăng nhập */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          <Card
            className="shadow-2xl border-0 rounded-2xl overflow-hidden"
            bodyStyle={{ padding: "48px 40px" }}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <UserOutlined className="text-white text-2xl" />
              </div>
              <Title level={2} className="!mb-2 !text-gray-800">
                Chào mừng trở lại
              </Title>
              <Text className="text-gray-500 text-base">
                Đăng nhập để tiếp tục
              </Text>
            </div>

            <Form
              name="login"
              onFinish={onFinish}
              layout="vertical"
              size="large"
              className="space-y-1">
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên đăng nhập!",
                  },
                ]}>
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Tên đăng nhập hoặc email"
                  className="rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-500 py-3"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}>
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Mật khẩu"
                  className="rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-500 py-3"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <div className="flex justify-between items-center mb-6">
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  className="!mb-0">
                  <Checkbox className="text-gray-600">
                    Ghi nhớ đăng nhập
                  </Checkbox>
                </Form.Item>
                <Link
                  to={URL.AUTH.FORGOT_PASSWORD}
                  className="text-blue-500 hover:text-blue-700 font-medium">
                  Quên mật khẩu?
                </Link>
              </div>

              <Form.Item className="!mb-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 border-0 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>

            <Divider className="!my-8">
              <Text className="text-gray-400 font-medium px-4">
                Hoặc tiếp tục với
              </Text>
            </Divider>

            <div className="space-y-3">
              <Button
                className="w-full h-12 flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:border-red-400 hover:text-red-500 hover:shadow-md transition-all duration-300"
                icon={<FcGoogle size={24} />}>
                Đăng nhập với Google
              </Button>

              <Button
                className="w-full h-12 flex items-center justify-center gap-3 bg-gray-900 border-2 border-gray-900 text-white rounded-lg font-medium hover:bg-black hover:border-black hover:shadow-md transition-all duration-300"
                icon={<FaGithub size={24} />}>
                Đăng nhập với Github
              </Button>
            </div>

            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <Text className="text-gray-500">
                Chưa có tài khoản?{" "}
                <Link
                  to={URL.AUTH.REGISTER}
                  className="text-blue-500 hover:text-blue-700 font-semibold">
                  Đăng ký miễn phí
                </Link>
              </Text>
            </div>
          </Card>

          <div className="text-center mt-6">
            <Text className="text-gray-400 text-sm">
              Bằng việc đăng nhập, bạn đồng ý với{" "}
              <Link className="text-gray-600 hover:text-blue-500">
                Điều khoản sử dụng
              </Link>{" "}
              và{" "}
              <Link href="#" className="text-gray-600 hover:text-blue-500">
                Chính sách bảo mật
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
