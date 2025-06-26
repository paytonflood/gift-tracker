import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import './App.css'; // Import the CSS file
import { db } from './firebase';

const GiftTracker = () => {
  const [gift, setGift] = useState({
    name: '',
    link: '',
    size: '',
    price: '',
    addedBy: 'payton', // Default to Payton
  });
  const [gifts, setGifts] = useState([]); // Used to store fetched gifts

  const fetchGifts = async () => {
    const querySnapshot = await getDocs(collection(db, 'gifts'));
    const giftsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setGifts(giftsList); // Update the state with the fetched gifts
  };

  useEffect(() => {
    fetchGifts(); // Fetch gifts when the component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGift((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (gift.name && gift.link && gift.price) {
      try {
        await addDoc(collection(db, 'gifts'), {
          name: gift.name,
          link: gift.link,
          size: gift.size || null,
          price: parseFloat(gift.price),
          addedBy: gift.addedBy, // Track who added the gift
        });
        setGift({
          name: '',
          link: '',
          size: '',
          price: '',
          addedBy: 'payton', // Reset to default
        });
        fetchGifts(); // Refresh the list after adding a gift
      } catch (error) {
        console.error('Error adding gift: ', error);
      }
    }
  };

  const handleDelete = async (giftId) => {
    try {
      await deleteDoc(doc(db, 'gifts', giftId)); // Delete the gift from Firestore
      fetchGifts(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting gift: ', error);
    }
  };

  return (
    <div>
      <h1>Gift Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={gift.name}
          onChange={handleChange}
          placeholder="Gift Name"
          required
        />
        <input
          type="url"
          name="link"
          value={gift.link}
          onChange={handleChange}
          placeholder="Gift Link"
          required
        />
        <input
          type="text"
          name="size"
          value={gift.size}
          onChange={handleChange}
          placeholder="Size (optional)"
        />
        <input
          type="number"
          name="price"
          value={gift.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <select name="addedBy" value={gift.addedBy} onChange={handleChange}>
          <option value="payton">Payton</option>
          <option value="hannah">Hannah</option>
        </select>
        <button type="submit">Add Gift</button>
      </form>

      <div>
        <h2>Gifts' Added by Payton</h2>
        <div className="gift-container">
          {gifts.filter((gift) => gift.addedBy === 'payton').map((gift) => (
            <div key={gift.id} className="gift-card">
              <h3>{gift.name}</h3>
              <p className="size">{gift.size || 'No size'}</p>
              <p className="price">${gift.price}</p>
              <a href={gift.link} target="_blank" rel="noopener noreferrer">
                View Gift
              </a>
              <button className="delete-btn" onClick={() => handleDelete(gift.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Gifts Added by Hannah</h2>
        <div className="gift-container">
          {gifts.filter((gift) => gift.addedBy === 'hannah').map((gift) => (
            <div key={gift.id} className="gift-card">
              <h3>{gift.name}</h3>
              <p className="size">{gift.size || 'No size'}</p>
              <p className="price">${gift.price}</p>
              <a href={gift.link} target="_blank" rel="noopener noreferrer">
                View Gift
              </a>
              <button className="delete-btn" onClick={() => handleDelete(gift.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftTracker;
