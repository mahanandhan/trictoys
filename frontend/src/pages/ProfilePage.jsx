import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://trictoys.onrender.com/api/auth/profile",
          { withCredentials: true }
        );
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-500 text-sm">Loading profile…</div>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-500 text-sm">User not found</div>
      </div>
    );

  const createdAt = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "—";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-[#FFE8EC] via-[#F3F6FF] to-[#E6F8FF] px-4 py-10">
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur rounded-3xl shadow-2xl px-6 py-6 md:px-10 md:py-8 flex flex-col md:flex-row gap-8">
        {/* Left: avatar + basic info */}
        <div className="md:w-1/3 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-8">
          <div className="relative">
            <div className="h-28 w-28 rounded-full bg-linear-to-tr from-[#F3313B] to-[#FFB347] p-[3px] shadow-lg">
              <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-4xl font-semibold text-[#F3313B]">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-400 border-4 border-white shadow-md" />
          </div>

          <h1 className="mt-4 text-xl md:text-2xl font-bold text-slate-900">
            {user.name}
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            TricToys Customer
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-1.5 text-[11px] font-medium text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Member since {createdAt}
          </div>

          <button className="mt-6 px-6 py-2.5 rounded-full bg-[#0F7BFF] text-white text-sm font-semibold shadow-[0_10px_25px_rgba(15,123,255,0.35)] hover:brightness-110 active:translate-y-px transition">
            Edit Profile
          </button>
        </div>

        {/* Right: details + quick stats */}
        <div className="md:w-2/3 flex flex-row gap-6">
          {/* Contact + address */}
          <div>
            <h2 className="text-sm font-semibold text-slate-900 mb-3">
              Account Details
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">Name</p>
                    <p className="text-slate-800">{user.username}</p>
                </div>
                <br />
                <span className="text-slate-400 text-lg">📧</span>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    Email
                  </p>
                  <p className="text-slate-800 break-all">{user.email}</p>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-lg">📱</span>
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Phone
                    </p>
                    <p className="text-slate-800">{user.phone}</p>
                  </div>
                </div>
              )}

              {user.address && (
                <div className="flex items-start gap-3">
                  <span className="text-slate-400 text-lg mt-0.5">📍</span>
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Default Address
                    </p>
                    <p className="text-slate-800 text-sm leading-relaxed">
                      {user.address}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick stats / recent info */}
          <div>
            {/* <h2 className="text-sm font-semibold text-slate-900 mb-3">
              TricToys Overview
            </h2> */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {/* <div className="rounded-2xl bg-[#FFF3F4] px-4 py-3">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  Orders
                </p>
                <p className="mt-1 text-lg font-bold text-[#F3313B]">
                  {user.totalOrders ?? 0}
                </p>
              </div> */}

              {/* <div className="rounded-2xl bg-[#EFF6FF] px-4 py-3">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  Spent
                </p>
                <p className="mt-1 text-lg font-bold text-[#0F7BFF]">
                  ₹{user.totalSpent ?? 0}
                </p>
              </div> */}

              {/* <div className="rounded-2xl bg-[#E9FBF4] px-4 py-3">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  Wishlist
                </p>
                <p className="mt-1 text-lg font-bold text-emerald-500">
                  {user.wishlistCount ?? 0}
                </p>
              </div> */}
            </div>
          </div>

          {/* Recent orders placeholder */}
          {/* <div>
            <h2 className="text-sm font-semibold text-slate-900 mb-2">
              Recent Orders
            </h2>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3 text-xs text-slate-500">
              Recent orders list will appear here once you connect it to the
              orders API.
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
