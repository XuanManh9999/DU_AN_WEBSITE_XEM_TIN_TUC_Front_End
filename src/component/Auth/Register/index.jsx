import React from "react";
import { Button, Card, Form, Input, Typography, Divider, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const { Title, Text } = Typography;
import { Link } from "react-router-dom";
import URL from "../../../utils/url";

export default function Register() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex">
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-blue-700/90 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
          alt="Register Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12">
          <div className="max-w-md text-center">
            <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
              Tham gia cộng đồng
              <br />
              <span className="text-yellow-300">Tin Tức 24/7</span>
            </h1>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Tạo tài khoản miễn phí để trải nghiệm đầy đủ các tính năng và nhận
              tin tức cá nhân hóa
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">Miễn phí</div>
                <div className="opacity-80">Hoàn toàn</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">30s</div>
                <div className="opacity-80">Đăng ký</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">∞</div>
                <div className="opacity-80">Tin tức</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          <Card
            className="shadow-2xl border-0 rounded-2xl overflow-hidden"
            bodyStyle={{ padding: "48px 40px" }}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <UserOutlined className="text-white text-2xl" />
              </div>
              <Title level={2} className="!mb-2 !text-gray-800">
                Tạo tài khoản mới
              </Title>
              <Text className="text-gray-500 text-base">
                Đăng ký để bắt đầu hành trình
              </Text>
            </div>

            <Form
              name="register"
              onFinish={onFinish}
              layout="vertical"
              size="large"
              className="space-y-1">
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email!",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ!",
                  },
                ]}>
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="Địa chỉ email"
                  className="rounded-lg border-gray-200 hover:border-green-400 focus:border-green-500 py-3"
                />
              </Form.Item>

              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên đăng nhập!",
                  },
                  {
                    min: 3,
                    message: "Tên đăng nhập phải có ít nhất 3 ký tự!",
                  },
                ]}>
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Tên đăng nhập"
                  className="rounded-lg border-gray-200 hover:border-green-400 focus:border-green-500 py-3"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                  {
                    min: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự!",
                  },
                ]}>
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Mật khẩu"
                  className="rounded-lg border-gray-200 hover:border-green-400 focus:border-green-500 py-3"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu xác nhận không khớp!")
                      );
                    },
                  }),
                ]}>
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Xác nhận mật khẩu"
                  className="rounded-lg border-gray-200 hover:border-green-400 focus:border-green-500 py-3"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <div className="mb-6">
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Vui lòng đồng ý với điều khoản!")
                            ),
                    },
                  ]}
                  className="!mb-0">
                  <Checkbox className="text-gray-600">
                    Tôi đồng ý với{" "}
                    <Link
                      href="#"
                      className="text-green-500 hover:text-green-700">
                      Điều khoản sử dụng
                    </Link>{" "}
                    và{" "}
                    <Link
                      href="#"
                      className="text-green-500 hover:text-green-700">
                      Chính sách bảo mật
                    </Link>
                  </Checkbox>
                </Form.Item>
              </div>

              <Form.Item className="!mb-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-600 border-0 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  Tạo tài khoản
                </Button>
              </Form.Item>
            </Form>

            <Divider className="!my-8">
              <Text className="text-gray-400 font-medium px-4">
                Hoặc đăng ký với
              </Text>
            </Divider>

            <div className="space-y-3">
              <Button
                className="w-full h-12 flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:border-red-400 hover:text-red-500 hover:shadow-md transition-all duration-300"
                icon={<FcGoogle size={24} />}>
                Đăng ký với Google
              </Button>

              <Button
                className="w-full h-12 flex items-center justify-center gap-3 bg-gray-900 border-2 border-gray-900 text-white rounded-lg font-medium hover:bg-black hover:border-black hover:shadow-md transition-all duration-300"
                icon={<FaGithub size={24} />}>
                Đăng ký với Github
              </Button>
            </div>

            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <Text className="text-gray-500">
                Đã có tài khoản?{" "}
                <Link
                  to={URL.AUTH.LOGIN}
                  className="text-green-500 hover:text-green-700 font-semibold">
                  Đăng nhập ngay
                </Link>
              </Text>
            </div>
          </Card>

          <div className="text-center mt-6">
            <Text className="text-gray-400 text-sm">
              Bằng việc đăng ký, bạn đồng ý nhận email thông báo và cập nhật từ
              chúng tôi
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
