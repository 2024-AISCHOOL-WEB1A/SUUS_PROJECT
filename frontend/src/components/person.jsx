import React, { useState, useEffect } from 'react';
import '../css/person.css';

// 초기 이미지를 명확하게 지정
const Person = ({ onImageChange }) => {
    const [formData, setFormData] = useState({
        name: '정부 24',
        email: 'support@gmail.com',
        phone: '+1234 55 66 777',
        website: '',
        password: '********'
    });
    const [profileImage, setProfileImage] = useState('/imgs/Group.73.png'); // 업로드한 이미지 경로
    const [selectedFileName, setSelectedFileName] = useState('');

    useEffect(() => {
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            setSelectedFileName(file.name);
            onImageChange(imageUrl);
            localStorage.setItem('profileImage', imageUrl);
        }
    };

    return (
        <div className="account-setting">
            <h2 className='h2person'>Account Setting</h2>
            <div className="tabs">
                {/* 탭 내용 */}
            </div>
            <div className="profile-section">
                <div className="profile-image">
                    <img src={profileImage} alt="Profile" />
                    <label className="change-button">
                        Change Here
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>
                <div className="profile-info">
                    <form>
                        <div className="form-row">
                            <div>
                                <label>NAME</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>EMAIL</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div>
                                <label>PHONE</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>WEBSITE</label>
                                <input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    placeholder="Website"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div>
                                <label>PASSWORD</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <button type="submit" className="save-button">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Person;
